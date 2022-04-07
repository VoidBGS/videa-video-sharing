using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using VideoService.Data;
using VideoService.Dtos;

namespace VideoService.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private readonly IVideoRepo _repository;
        private IMapper _mapper;

        public VideosController(IVideoRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<VideoReadDto>> GetAllVideos()
        {
            Console.WriteLine("Geting All Videos..");
            var videoItems = _repository.GetAllVideos();

            return Ok(_mapper.Map<IEnumerable<VideoReadDto>>(videoItems));
        }
    }
}
