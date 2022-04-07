
using VideoService.Models;

namespace VideoService.Data
{
    public static class SeedDatabase
    {
        public static void PrepData(IApplicationBuilder app)
        {
            using( var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<AppDbContext>());
            }
        }

        private static void SeedData(AppDbContext context)
        {
            if (!context.Videos.Any())
            {
                Console.WriteLine("Seeding Database");

                context.Videos.AddRange(
                    new Video() { Author = "Kristian", Length = "2:31", Title = "How I saved my semester", URL = "https://www.youtube.com/watch?v=f-DhXLSFHt4" },
                    new Video() { Author = "JWick", Length = "13:37", Title = "Blue pill Red Pill", URL = "https://www.youtube.com/watch?v=pFS4zYWxzNA" },
                    new Video() { Author = "Gotham", Length = "19:21", Title = "How to fight a kangaroo (and talk to eggs)", URL = "https://www.youtube.com/watch?v=fQ_A8MJ1-bM" }
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
