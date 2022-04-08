using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GatewayService.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class GatewayController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public GatewayController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }
        [HttpGet]
        public async Task<IActionResult> Videos()
            => await ProxyTo("http://localhost:7000/api/videos");
        [HttpGet]
        public async Task<IActionResult> Likes()
            => await ProxyTo("http://localhost:8000/api/l/videos/");
        private async Task<ContentResult> ProxyTo(string url)
            => Content(await _httpClient.GetStringAsync(url));
    }
}
