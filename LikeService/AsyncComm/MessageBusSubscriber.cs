using LikeService.EventProcessing;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace LikeService.AsyncComm
{
    public class MessageBusSubscriber : BackgroundService
    {
        private readonly IConfiguration _config;
        private readonly IEventProcessor _eventProcessor;
        private IConnection connection;
        private IModel channel;
        private string queueName;

        public MessageBusSubscriber(IConfiguration config, IEventProcessor eventProcessor)
        {
            _config = config;
            _eventProcessor = eventProcessor;

            InitializeRabbitMQ();
        }

        private void InitializeRabbitMQ()
        {
            var factory = new ConnectionFactory()
            {
                UserName = _config["RabbitMQUsername"],
                Password = _config["RabbitMQPassword"],
                HostName = _config["RabbitMQHost"],
                Port = int.Parse(_config["RabbitMQPort"])
            };

            try
            {
                connection = factory.CreateConnection();
                channel = connection.CreateModel();
                channel.ExchangeDeclare(exchange: _config["RabbitMQExchange"], type: ExchangeType.Fanout);
                queueName = channel.QueueDeclare().QueueName;
                channel.QueueBind(
                    queue: queueName,
                    exchange: _config["RabbitMQExchange"],
                    routingKey: "");

                Console.WriteLine("Listening to RabbitMQ");

                connection.ConnectionShutdown += RabbitMQ_ShutdownConnection;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Unable to Connect to RabbitMQ: " + ex.InnerException);
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (ModuleHandle, ea) =>
            {
                Console.WriteLine("Event Received by consumer");
                var body = ea.Body;
                var notif = Encoding.UTF8.GetString(body.ToArray());

                _eventProcessor.ProcessEvent(notif);
            };

            channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);

            return Task.CompletedTask;
        }

        private void RabbitMQ_ShutdownConnection(object sender, ShutdownEventArgs e)
        {
            Console.WriteLine("Connection shutdown");
        }

        public override void Dispose()
        {
            if(channel != null)
            {
                if (channel.IsOpen)
                {
                    channel.Close();
                    connection.Close();
                }

                base.Dispose();
            }
            else
            {
                Console.WriteLine("Nothing to dispose of as channel var is null");
            }
        }
    }
}
