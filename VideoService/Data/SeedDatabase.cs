
using Microsoft.EntityFrameworkCore;
using VideoService.Models;

namespace VideoService.Data
{
    public static class SeedDatabase
    {
        public static void PrepData(IApplicationBuilder app, bool isProd)
        {
            using( var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<AppDbContext>(), isProd);
            }
        }

        private static void SeedData(AppDbContext context, bool isProd)
        {

            Console.WriteLine("Attempting to apply migrations to database.");

            if (isProd) { 
                try
                {
                    context.Database.Migrate();
                }
                catch(Exception ex)
                {
                    Console.WriteLine("Migration failed. Error: " + ex.Message);
                }
            }

            if (!context.Videos.Any())
            {
                Console.WriteLine("Seeding Database");

                context.Videos.AddRange(
                    new Video() { Author = "Kristian", Length = "2:31", Thumbnail = "https://i.ytimg.com/vi/yOiqd8eQ8tI/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAZHzJfLlElQqysQvNJ0jjb9f_nwA", Title = "May, Clarkson, Hammond 'Jaaaag' and Jaguar Stereotypes Compilation.", URL = "https://www.youtube.com/embed/yOiqd8eQ8tI" },
                    new Video() { Author = "JWick", Length = "13:37", Thumbnail = "https://i.ytimg.com/vi/iT-cYYgKSSE/hqdefault.jpg", Title = "Making a Million Dollars from CS:GO's Economy - quickly.", URL = "https://www.youtube.com/embed/iT-cYYgKSSE" },
                    new Video() { Author = "Gotham", Length = "19:21", Thumbnail= "https://i.ytimg.com/vi/5Z2mnqFYFV0/hq720.jpg", Title = "How to fight a kangaroo (and talk to eggs)", URL = "https://www.youtube.com/embed/fQ_A8MJ1-bM" }
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
