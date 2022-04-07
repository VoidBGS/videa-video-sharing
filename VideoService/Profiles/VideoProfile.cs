using AutoMapper;
using VideoService.Dtos;
using VideoService.Models;

namespace VideoService.Profiles
{
    public class VideoProfile : Profile
    {
        public VideoProfile()
        {
            CreateMap<Video, VideoReadDto>();
            CreateMap<VideoPostDto, Video>();
        }
    }
}
