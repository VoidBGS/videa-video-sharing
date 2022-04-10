using System.ComponentModel.DataAnnotations;

namespace VideoService.Models
{
    public class Video
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Length { get; set; }

        [Required]
        public string Thumbnail { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string URL { get; set; }
    }
}