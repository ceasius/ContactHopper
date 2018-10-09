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
            var str = await response.Content.ReadAsStringAsync();
            var content = await response.Content.ReadAsJsonAsync<DbSet<Entry>>();

            //var dto = content?.FirstOrDefault();

            ////Assert
            //Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            //Assert.NotNull(dto);
            //Assert.NotEmpty(dto.Name);
            //Assert.NotEmpty(dto.PhoneNumber);
        }

        [Fact]
        public void TestPost()
        {
            //Arrange

            var dto = new Entry
            {
                Name = "POST TEST",
                PhoneNumber = "0833452693",
            };

            //Act
            var post = _client.PostAsJsonAsync(ControllerPage, dto).Result;
            var postContent = post.Content.ReadAsJsonAsync<Entry>().Result;

            var get = _client.GetAsync($"{ControllerPage}{postContent.Id}").Result;
            var getContent = get.Content.ReadAsJsonAsync<Entry>().Result;

            //Assert
            Assert.Equal(HttpStatusCode.OK, post.StatusCode);
            Assert.NotEqual(0, postContent.Id);

            Assert.Equal(HttpStatusCode.OK, get.StatusCode);
        }

        [Fact]
        public void TestPagesPut()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "PUT TEST 1",
                PhoneNumber = "0833452693",
            };

            //Act
            var post = _client.PostAsJsonAsync(ControllerPage, dto).Result;
            var postContent = post.Content.ReadAsJsonAsync<Entry>().Result;

            dto.Id = postContent.Id;
            dto.Name = "PUT TEST 2";

            var put = _client.PutAsJsonAsync($"{ControllerPage}{postContent.Id}", dto).Result;
            var putContent = put.Content.ReadAsJsonAsync<Entry>().Result;

            var get = _client.GetAsync($"{ControllerPage}{postContent.Id}").Result;
            var getContent = get.Content.ReadAsJsonAsync<Entry>().Result;

            //Assert
            Assert.Equal(HttpStatusCode.OK, put.StatusCode);
            Assert.Equal(HttpStatusCode.OK, post.StatusCode);
            Assert.Equal(HttpStatusCode.OK, get.StatusCode);

            Assert.NotNull(putContent);

        }

        [Fact]
        public void TestPagesDelete()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "DELETE TEST 1",
                PhoneNumber = "0833452693",
            };

            //Act
            var post = _client.PostAsJsonAsync(ControllerPage, dto).Result;
            var postContent = post.Content.ReadAsJsonAsync<Entry>().Result;

            var get = _client.GetAsync($"{ControllerPage}{postContent.Id}").Result;
            var content = get.Content.ReadAsJsonAsync<Entry>().Result;

            var delete = _client.DeleteAsync($"{ControllerPage}{postContent.Id}").Result;
            var deleteContent = delete.Content.ReadAsJsonAsync<Entry>().Result;

            var getDelete = _client.GetAsync($"{ControllerPage}{postContent.Id}").Result;
            var getContent = getDelete.Content.ReadAsStringAsync().Result;

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
