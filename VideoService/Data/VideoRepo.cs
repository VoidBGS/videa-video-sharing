using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VideoService.Models;

namespace VideoService.Data
{
    public class VideoRepo : IVideoRepo
    {
        private readonly AppDbContext _context;

        public VideoRepo(AppDbContext context)
        {
             _context = context;
        }

        public void CreateVideo(Video vid)
        {
            if(vid == null)
            {
                throw new ArgumentNullException(nameof(vid));
            }
            _context.Videos.Add(vid);
        }

        public IEnumerable<Video> GetAllVideos()
        {
            return _context.Videos.ToList();
        }

        public Video GetVideoById(int id)
        {
            return _context.Videos.FirstOrDefault(x => x.Id == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
