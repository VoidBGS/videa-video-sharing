using AutoMapper;
using LikeService.Data;
using LikeService.Dtos;
using LikeService.Models;
using Microsoft.AspNetCore.Mvc;

namespace LikeService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ILikeRepo _repository;
        private readonly IMapper _mapper;

        public LikesController(ILikeRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        public ActionResult CreateLike(LikePostDto likePostDto)
        {
            var like = _mapper.Map<Like>(likePostDto);
            _repository.CreateLike(like);
            _repository.SaveChanges();

            return Ok("Like has been created");
        }

        [HttpGet("{id}")]
        public ActionResult GetAllVideoLikes(int id)
        {
            var likes = _repository.GetVideoLikes(id);

            return Ok("Amount of likes " + likes + " Video id supplied " + id);
        }
    }
}
