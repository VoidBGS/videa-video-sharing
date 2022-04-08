using System;
using Microsoft.AspNetCore.Mvc;

namespace LikeService.Controllers
{
    [Route("api/l/[controller]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        public VideosController()
        {
            
        }

        [HttpPost]
        public ActionResult TestInboundConnection()
        {
            Console.WriteLine("Testing inbouund Post Connection");

            return Ok("Test of inbound Post Connection was okay");
        }
    }
}
