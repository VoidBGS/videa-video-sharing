using LikeService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LikeService.Data
{
    public class LikeRepo : ILikeRepo
    {
        private readonly AppDbContext _context;

        public LikeRepo(AppDbContext context)
        {
            _context = context;
        }
        public void CreateLike(Like like)
        {
            if(like == null)
            {
                throw new ArgumentNullException(nameof(like));
            }
            _context.Likes.Add(like);
        }

        public int GetVideoLikes(int videoId)
        {
            return _context.Likes.Where(l => l.VideoId == videoId).Count();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
