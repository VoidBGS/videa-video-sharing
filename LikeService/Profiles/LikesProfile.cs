using AutoMapper;
using LikeService.Dtos;
using LikeService.Models;

namespace LikeService.Profiles
{
    public class LikesProfile : Profile
    {
        public LikesProfile()
        {
            CreateMap<LikePostDto, Like>();
            CreateMap<LikeReadDto, Like>();
            CreateMap<VideoPublishedDto, Like>();
        }
    }
}
