using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VideoService.Dtos
{
    public class VideoReadDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Length { get; set; }

        public string Thumbnail { get; set; }

        public string Author { get; set; }

        public string URL { get; set; }
    }
}
