using LikeService.Models;
using System.ComponentModel.DataAnnotations;

namespace LikeService.Dtos
{
    public class LikePostDto
    {
        [Required]
        public int VideoId { get; set; }

    }
}
