using ContactHopper.API.Controllers;
using ContactHopper.API.Data.Context;
using ContactHopper.API.Data.Entities;
using ContactHopper.API.UnitTests.Controllers.Resources;
using Xunit;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactHopper.API.UnitTests.Controllers
{
    public class EntriesControllerTest : IClassFixture<TestFixture>
    {
        private readonly DataContext _context;
        private readonly EntriesController _controller;
        public EntriesControllerTest(TestFixture fixture)
        {
            _context = fixture.Context;
            var logger = fixture.CreateMockLogger<EntriesController>();
            _controller = new EntriesController(_context, logger);
        }

        [Fact]
        public async void TestGet()
        {
            //Arrange
            var id = _context.Entries
                .Select(c => c.Id)
                .FirstOrDefault();

            //Act
            var result = await _controller.GetEntry(id);

            var dto = result.GetValue<OkObjectResult, Entry>();

            //Assert
            Assert.NotNull(dto);
            Assert.Equal(id, dto.Id);
            Assert.NotEmpty(dto.Name);
            Assert.NotEmpty(dto.PhoneNumber);
        }
        [Fact]
        public void TestGetAll()
        {
            //Arrange

            //Act
            var result = _controller.GetEntries();

            var list = result.GetValue<OkObjectResult, IQueryable<Entry>>();

            var dto = list.FirstOrDefault();

            //Assert
            Assert.NotNull(dto);
            Assert.NotEqual(0, dto.Id);
            Assert.NotEmpty(dto.Name);
            Assert.NotEmpty(dto.PhoneNumber);
        }
        [Fact]
        public async void TestPut()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "PUT TEST",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            _context.Add(dto);
            await _context.SaveChangesAsync();

            dto.Name = "PUT TEST(2)";
            dto.PhoneNumber = "0833452693(2)";

            //Act
            var result = await _controller.PutEntry(dto.Id, dto);

            var value = result.GetValue<OkObjectResult, Entry>();

            var check = _context.Entries
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.NotNull(value);
            Assert.NotEqual(0, value.Id);
            Assert.NotEqual("PUT TEST", check.Name);
            Assert.NotEqual("0833452693", check.PhoneNumber);
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
            var result = await _controller.PostEntry(dto);

            var value = result.GetValue<OkObjectResult, Entry>();

            var check = _context.Entries
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.NotNull(value);
            Assert.NotEqual(0, value.Id);
            Assert.NotEmpty(value.Name);
            Assert.NotEmpty(value.PhoneNumber);
        }

        [Fact]
        public async void TestDelete()
        {
            //Arrange
            var dto = new Entry
            {
                Name = "DELETE TEST",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            _context.Add(dto);
            await _context.SaveChangesAsync();

            //Act
            var result = await _controller.DeleteEntry(dto.Id);

            var value = result.GetValue<OkObjectResult, Entry>();

            var check = _context.Entries
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.Null(check);
        }
    }
}
