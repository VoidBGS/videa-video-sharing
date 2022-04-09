using AutoMapper;
using LikeService.Dtos;
using LikeService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeService.Profiles
{
    public class LikesProfile : Profile
    {
        public LikesProfile()
        {
            CreateMap<LikePostDto, Like>();
            CreateMap<LikeReadDto, Like>();
        }
    }
}
