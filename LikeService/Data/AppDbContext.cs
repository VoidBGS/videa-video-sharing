using LikeService.Models;
using Microsoft.EntityFrameworkCore;

namespace LikeService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {

        }

        public DbSet<Like> Likes { get; set; }
    }
}
