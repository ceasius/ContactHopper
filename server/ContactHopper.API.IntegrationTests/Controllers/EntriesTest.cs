using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using Xunit;
using System.Linq;
using ContactHopper.API.IntegrationTests.Controllers.Resources;
using ContactHopper.API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactHopper.API.IntegrationTests.Controllers
{
    [Collection("IntegrationTestFixture")]
    public class EntriesTest : IDisposable
    {
        private const string ControllerPage = "/api/entries/";
        private readonly HttpClient _client;

        public EntriesTest(IntegrationTestFixture fixture)
        {
            _client = fixture.Client;

            _client.DefaultRequestHeaders.Clear();
        }

        public void Dispose()
        {
            _client.DefaultRequestHeaders.Clear();
        }

        [Fact]
        public async void TestGetAll()
        {
            //Arrange

            //Act
            var response = await _client.GetAsync(ControllerPage);
            var content = await response.Content.ReadAsJsonAsync<List<Entry>>();

            var dto = content?.FirstOrDefault();

            //Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(dto);
            Assert.NotEmpty(dto.Name);
            Assert.NotEmpty(dto.PhoneNumber);
        }

        [Fact]
        public async void TestPost()
        {
            //Arrange

            var dto = new Entry
            {
                Name = "POST TEST",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            //Act
            var post = await _client.PostAsJsonAsync(ControllerPage, dto);
            var postContent = await post.Content.ReadAsJsonAsync<Entry>();

            var get = await _client.GetAsync($"{ControllerPage}{postContent.Id}");
            var getContent = await get.Content.ReadAsJsonAsync<Entry>();

            //Assert
            Assert.Equal(HttpStatusCode.OK, post.StatusCode);
            Assert.NotEqual(0, postContent.Id);

            Assert.Equal(HttpStatusCode.OK, get.StatusCode);
        }

        [Fact]
        public async void TestPut()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "PUT TEST 1",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            //Act
            var post = await _client.PostAsJsonAsync(ControllerPage, dto);
            var postContent = await post.Content.ReadAsJsonAsync<Entry>();

            dto.Id = postContent.Id;
            dto.Name = "PUT TEST 2";

            var put = await _client.PutAsJsonAsync($"{ControllerPage}{postContent.Id}", dto);
            var putContent = await put.Content.ReadAsJsonAsync<Entry>();

            var get = await _client.GetAsync($"{ControllerPage}{postContent.Id}");
            var getContent = await get.Content.ReadAsJsonAsync<Entry>();

            //Assert
            Assert.Equal(HttpStatusCode.OK, put.StatusCode);
            Assert.Equal(HttpStatusCode.OK, post.StatusCode);
            Assert.Equal(HttpStatusCode.OK, get.StatusCode);

            Assert.NotNull(putContent);

        }

        [Fact]
        public async void TestDelete()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "DELETE TEST 1",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            //Act
            var post = await _client.PostAsJsonAsync(ControllerPage, dto);
            var str = await post.Content.ReadAsStringAsync();
            var postContent = await post.Content.ReadAsJsonAsync<Entry>();

            var get = await _client.GetAsync($"{ControllerPage}{postContent.Id}");
            var content = await get.Content.ReadAsJsonAsync<Entry>();

            var delete = await _client.DeleteAsync($"{ControllerPage}{postContent.Id}");
            var deleteContent = await delete.Content.ReadAsJsonAsync<Entry>();

            var getDelete = await _client.GetAsync($"{ControllerPage}{postContent.Id}");
            var getContent = await getDelete.Content.ReadAsStringAsync();

            //Assert
            Assert.Equal(HttpStatusCode.OK, post.StatusCode);
            Assert.Equal(HttpStatusCode.OK, get.StatusCode);
            Assert.NotNull(postContent);
            Assert.NotNull(content);

            Assert.Equal(HttpStatusCode.OK, delete.StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, getDelete.StatusCode);
            Assert.NotNull(deleteContent);
            Assert.Empty(getContent);
        }
    }
}
