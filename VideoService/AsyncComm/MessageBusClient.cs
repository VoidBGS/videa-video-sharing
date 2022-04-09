using RabbitMQ.Client;
using System.Text;
using System.Text.Json;
using VideoService.Dtos;

namespace VideoService.AsyncComm
{
    public class MessageBusClient : IMessageBusClient
    {
        private readonly IConfiguration _config;
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public MessageBusClient(IConfiguration config)
        {
            _config = config;
            var factory = new ConnectionFactory()
            {
                UserName = _config["RabbitMQUsername"],
                Password = _config["RabbitMQPassword"],
                HostName = _config["RabbitMQHost"],
                Port = int.Parse(_config["RabbitMQPort"])
            };

            try
            {
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                _channel.ExchangeDeclare(exchange: _config["RabbitMQExchange"], type: ExchangeType.Fanout);

                _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;

                Console.WriteLine("Connected to RabbitMQ");
            }
            catch(Exception ex)
            {
                Console.WriteLine("Rabbit MQ Error: " + ex.Message);
            }
        }

        public void PublishNewVideo(VideoPublishDto videoPublishDto)
        {
            var message = JsonSerializer.Serialize(videoPublishDto);

            if (_connection.IsOpen)
            {
                Console.WriteLine("Rabbit MQ is running, sending message...");
                SendMessage(message);
            }
            else
            {
                Console.WriteLine("Rabbit MQ connection is closed.");
            }
        }

        private void SendMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(
                    exchange: _config["RabbitMQExchange"],
                    routingKey: "",
                    basicProperties: null,
                    body: body
                );
            Console.WriteLine("Message has been published " + message);
        }

        public void Dispose()
        {
            Console.WriteLine("Closing RabbitMQ Connection");
            if (_channel.IsOpen)
            {
                _channel.Close();
                _connection.Close();
            }
        }

        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e)
        {
            Console.WriteLine("Rabbit MQ Connection Closed.");
        }
    }
}
