using AutoMapper;
using LikeService.Data;
using LikeService.Dtos;
using LikeService.Models;
using System.Text.Json;

namespace LikeService.EventProcessing
{
    public class EventProcessor : IEventProcessor
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IMapper _mapper;

        public EventProcessor(IServiceScopeFactory scopeFactory, IMapper mapper)
        {
            _scopeFactory = scopeFactory;
            _mapper = mapper;
        }

        public void ProcessEvent(string message)
        {
            var eventType = LookupEvent(message);

            switch (eventType)
            {
                case EventType.VideoPublished:
                    AddLike(message);
                    break;
                default:
                    Console.WriteLine("Event Type undefined");
                    break;
            }
            throw new NotImplementedException();

        }

        private EventType LookupEvent(string notif)
        {
            Console.WriteLine("Looking up event");
            var deSerializedEvent = JsonSerializer.Deserialize<GenericEventDto>(notif);

            switch (deSerializedEvent.Event)
            {
                case "Video Published":
                    return EventType.VideoPublished;
                default:
                    Console.WriteLine("Event Undefined");
                    return EventType.Undefined;
            }
        }

        private void AddLike(string videoPublishedMessage)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var repo = scope.ServiceProvider.GetRequiredService<ILikeRepo>();

                var videoPublishedDto = JsonSerializer.Deserialize<VideoPublishedDto>(videoPublishedMessage);

                try
                {
                    Console.WriteLine(JsonSerializer.Serialize("PublishedVideoDto deserialized " + videoPublishedDto));

                    if(videoPublishedDto != null)
                    {
                        var videoId = videoPublishedDto.Id;
                        var videoLikes = repo.GetVideoLikes(videoId);
                        if(videoLikes == 0)
                        {
                            var like = new Like { VideoId = videoId };

                            repo.CreateLike(like);
                            repo.SaveChanges();
                        }
                    }
                    else
                    {
                        Console.WriteLine("Video id could not be found.");
                    }
                }
                catch(Exception ex)
                {
                    Console.WriteLine("Could not add Like to a Video via event: " + ex.Message);
                }
            }
        }
    }
}
