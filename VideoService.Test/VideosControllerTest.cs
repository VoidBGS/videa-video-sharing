using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using VideoService.Models;

namespace VideoService.Test
{
    [TestClass]
    public class VideosControllerTest
    {
        [TestMethod]
        public async Task Get_All_Videos_Returns_Correctly()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();

            //Act
            var response = await httpClient.GetAsync("/api/videos");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.AreNotEqual(result, "");
        }
        [TestMethod]
        public async Task Get_Video_By_Id_Returns_Not_Null()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int videoId = 1;

            //Act
            var response = await httpClient.GetAsync($"/api/videos/{videoId}");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.IsNotNull(result);
        }
        [TestMethod]
        public async Task Get_Video_By_Correct_Id_Does_Not_Return_Empty_String()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int videoId = 1;

            //Act
            var response = await httpClient.GetAsync($"/api/videos/{videoId}");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.AreNotEqual(result, "");
        }
        [TestMethod]
        public async Task Get_Video_By_Wrong_Id_Returns_Error_Message()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int incorrectVideoId = 1337;

            //Act
            var response = await httpClient.GetAsync($"/api/videos/{incorrectVideoId}");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.AreEqual("Video has not been found", result);
        }
        [TestMethod]
        public async Task Get_Video_By_Id_Returns_Correct_Video()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int videoId = 1;
            string expectedAuthor = "Kristian";

            //Act
            var response = await httpClient.GetAsync($"/api/videos/{videoId}");
            var result = await response.Content.ReadAsStringAsync();
            dynamic serializedResult = JObject.Parse(result);

            //Assert
            Assert.AreEqual(expectedAuthor, Convert.ToString(serializedResult.author));
        }
        [TestMethod]
        public async Task Delete_Video_By_Correct_Id()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int videoId = 3;

            //Act
            var response = await httpClient.DeleteAsync($"/api/videos/{videoId}");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.AreEqual("Video deleted successfully", result);
        }
        [TestMethod]
        public async Task Delete_Video_By_Incorrect_Id()
        {
            //Arrange
            var webAppFactory = new WebApplicationFactory<Program>();
            var httpClient = webAppFactory.CreateDefaultClient();
            int videoId = 1337;

            //Act
            var response = await httpClient.DeleteAsync($"/api/videos/{videoId}");
            var result = await response.Content.ReadAsStringAsync();

            //Assert
            Assert.AreEqual("Video has not been found", result);
        }
        //[TestMethod]
        //public async Task Create_Video()
        //{
        //    //Arrange
        //    var webAppFactory = new WebApplicationFactory<Program>();
        //    var httpClient = webAppFactory.CreateDefaultClient();

        //    string title = "if this coconut picture gets deleted, tf2 stops working (jk, just a misconception being spread)";
        //    string length = "4:15";
        //    string thumbnail = "https://i.ytimg.com/vi/WLx_3bON0Mw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBCA6nCy5Tg6kTM0Agb8VzONd7eOQ";
        //    string author = "someoneElse";
        //    string url = "https://www.youtube.com/embed/WLx_3bON0Mw";

        //    Video videoObj = new Video() { Title = title, Length = length, Thumbnail = thumbnail,Author = author, URL = url };
        //    var stringContent = new StringContent(videoObj.ToString().ToLower(), Encoding.UTF8, "application/json");

        //    //Act
        //    var response = await httpClient.PostAsync($"/api/videos", stringContent);
        //    var result = await response.Content.ReadAsStringAsync();
        //    dynamic serializedResult = JObject.Parse(result);

        //    //Assert
        //    Assert.AreEqual(author, Convert.ToString(serializedResult.author));
        //}
    }
}