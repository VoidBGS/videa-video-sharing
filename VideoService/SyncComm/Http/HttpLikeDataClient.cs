using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace VideoService.SyncComm.Http
{
    public class HttpLikeDataClient : ILikeDataClient
    {
        private readonly HttpClient _httpClient;
        private IConfiguration _config;

        public HttpLikeDataClient(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }


        public async Task SendVideoIdToLikes(int id)
        {
            var httpContent = new StringContent(
                JsonSerializer.Serialize(id),
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(_config["LikeService"], httpContent);

            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine("Send video id to likes has succeeded");
            }
            else
            {
                Console.WriteLine("Send video id to likes has NOT succeeded :(");
            }
        }
    }
}
