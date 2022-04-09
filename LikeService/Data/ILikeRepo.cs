using LikeService.Models;

namespace LikeService.Data
{
    public interface ILikeRepo
    {
        bool SaveChanges();

        public int GetVideoLikes(int videoId);

        void CreateLike(Like like);
    }
}
