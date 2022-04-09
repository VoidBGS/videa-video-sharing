using VideoService.Dtos;

namespace VideoService.AsyncComm
{
    public interface IMessageBusClient
    {
        void PublishNewVideo(VideoPublishDto videoPublish);
    }
}
