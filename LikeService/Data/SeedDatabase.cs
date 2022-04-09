using LikeService.Models;

namespace LikeService.Data
{
    public static class SeedDatabase
    {
        public static void PrepData(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<AppDbContext>());
            }
        }

        private static void SeedData(AppDbContext context)
        {
            if (!context.Likes.Any())
            {
                Console.WriteLine("Seeding Database");

                context.Likes.AddRange(
                        new Like() { VideoId = 1 },
                        new Like() { VideoId = 1 },
                        new Like() { VideoId = 1 },
                        new Like() { VideoId = 1 },
                        new Like() { VideoId = 2 },
                        new Like() { VideoId = 2 }
                    );

                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("Data already seeded.");
            }
        }
    }
}
