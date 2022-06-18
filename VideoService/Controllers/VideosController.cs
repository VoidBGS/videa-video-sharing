using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VideoService.AsyncComm;
using VideoService.Data;
using VideoService.Dtos;
using VideoService.Models;
using VideoService.SyncComm.Http;

namespace VideoService.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private readonly IVideoRepo _repository;
        private IMapper _mapper;
        private readonly ILikeDataClient _likeDataClient;
        private readonly IMessageBusClient _messageBusClient;

        public VideosController(
            IVideoRepo repository,
            IMapper mapper,
            ILikeDataClient likeDataClient,
            IMessageBusClient messageBusClient)
        {
            _repository = repository;
            _mapper = mapper;
            _likeDataClient = likeDataClient;
            _messageBusClient = messageBusClient;
        }

        [HttpGet]
        public ActionResult<IEnumerable<VideoReadDto>> GetAllVideos()
        {
            Console.WriteLine("Geting All Videos..");
            var videoItems = _repository.GetAllVideos();

            return Ok(_mapper.Map<IEnumerable<VideoReadDto>>(videoItems));
        }

        [HttpGet("{id}", Name = "GetVideoById")]
        public ActionResult<VideoReadDto> GetVideoById(int id)
        {
            var video = _repository.GetVideoById(id);
            if(video != null)
            {
                return Ok(_mapper.Map<VideoReadDto>(video));
            }

            return NotFound("Video has not been found");
        }

        [HttpPost]
        public async Task<ActionResult<VideoPostDto>> CreateVideo(VideoPostDto videoPostDto)
        {
            var video = _mapper.Map<Video>(videoPostDto);
            _repository.CreateVideo(video);
            _repository.SaveChanges();

            var videoReadDto = _mapper.Map<VideoReadDto>(video);
            
            try
            {
                var videoPublishedDto = _mapper.Map<VideoPublishDto>(videoReadDto);
                videoPublishedDto.Event = "Video Published";
                _messageBusClient.PublishNewVideo(videoPublishedDto);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Could not send using RabbitMQ. Error: " + ex.Message);
            }
            return CreatedAtRoute(nameof(GetVideoById), new { id = videoReadDto.Id }, videoReadDto);
        }

        [HttpDelete("{id}", Name = "DeleteVideo")]
        public ActionResult<VideoReadDto> DeleteVideo(int id)
        {
            var isDeleted = _repository.DeleteVideo(id);
            _repository.SaveChanges();

            if (isDeleted)
            {
                return Ok("Video deleted successfully");
            }

            return NotFound("Video has not been found");
        }
    }
}
