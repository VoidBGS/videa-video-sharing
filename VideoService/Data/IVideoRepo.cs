using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoService.Models;

namespace VideoService.Data
{
    public interface IVideoRepo
    {
        bool SaveChanges();

        IEnumerable<Video> GetAllVideos();

        Video GetVideoById(int id);

        void CreateVideo(Video vid);

        bool DeleteVideo(int id);

    }
}
