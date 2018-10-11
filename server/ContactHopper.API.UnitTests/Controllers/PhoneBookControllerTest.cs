using ContactHopper.API.Controllers;
using ContactHopper.API.Data.Context;
using ContactHopper.API.Data.Entities;
using ContactHopper.API.UnitTests.Controllers.Resources;
using Xunit;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ContactHopper.API.UnitTests.Controllers
{
    public class PhoneBooksControllerTest : IClassFixture<TestFixture>
    {
        private readonly DataContext _context;
        private readonly PhoneBooksController _controller;
        public PhoneBooksControllerTest(TestFixture fixture)
        {
            _context = fixture.Context;
            var logger = fixture.CreateMockLogger<PhoneBooksController>();
            _controller = new PhoneBooksController(_context, logger);
        }

        [Fact]
        public async void TestGet()
        {
            //Arrange
            var id = _context.Entries
                .Select(c => c.Id)
                .FirstOrDefault();

            //Act
            var result = await _controller.GetPhoneBook(id);

            var dto = result.GetValue<OkObjectResult, PhoneBook>();

            //Assert
            Assert.NotNull(dto);
            Assert.Equal(id, dto.Id);
            Assert.NotEmpty(dto.Name);
        }
        [Fact]
        public void TestGetAll()
        {
            //Arrange

            //Act
            var result = _controller.GetPhoneBooks();

            var list = result.GetValue<OkObjectResult, IQueryable<PhoneBook>>();

            var dto = list.FirstOrDefault();

            //Assert
            Assert.NotNull(dto);
            Assert.NotEqual(0, dto.Id);
            Assert.NotEmpty(dto.Name);
        }
        [Fact]
        public async void TestPut()
        {
            //Arrange
            var dto = new PhoneBook
            {
                Name = "PUT TEST",
            };

            _context.Add(dto);
            await _context.SaveChangesAsync();

            dto.Name = "PUT TEST(2)";

            //Act
            var result = await _controller.PutPhoneBook(dto.Id, dto);

            var value = result.GetValue<OkObjectResult, PhoneBook>();

            var check = _context.PhoneBooks
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.NotNull(value);
            Assert.NotEqual(0, value.Id);
            Assert.NotEqual("PUT TEST", check.Name);
        }

        [Fact]
        public async void TestPost()
        {
            //Arrange
            var dto = new PhoneBook
            {
                Name = "POST TEST",
            };

            //Act
            var result = await _controller.PostPhoneBook(dto);

            var value = result.GetValue<OkObjectResult, PhoneBook>();

            var check = _context.PhoneBooks
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.NotNull(value);
            Assert.NotEqual(0, value.Id);
            Assert.NotEmpty(value.Name);
        }

        [Fact]
        public async void TestDelete()
        {
            //Arrange
            var dto = new PhoneBook
            {
                Name = "DELETE TEST",
            };

            _context.Add(dto);
            await _context.SaveChangesAsync();

            //Act
            var result = await _controller.DeletePhoneBook(dto.Id);

            var value = result.GetValue<OkObjectResult, PhoneBook>();

            var check = _context.PhoneBooks
                .FirstOrDefault(e => e.Id == value.Id);

            //Assert
            Assert.Null(check);
        }
    }
}
