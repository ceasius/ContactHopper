using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Moq;
using ContactHopper.API.Data.Context;
using Microsoft.Extensions.Logging;
using ContactHopper.API.Data.Entities;

namespace ContactHopper.API.UnitTests.Controllers.Resources
{
    public class TestFixture : IDisposable
    {
        public DataContext Context { get; }
        public List<object> LogList { get; }

        public TestFixture()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "UnitTest_MetricDatabase").Options;
            //Using In Memory Db instead of mocks or stubs, because it's much easier to set up
            Context = new DataContext(options);
            LogList = new List<object>();

            SeedData();
        }

        public ILogger<T> CreateMockLogger<T>()
        {
            var mock = new Mock<ILogger<T>>();

            mock.Setup(m => m.IsEnabled(It.IsAny<LogLevel>()))
                .Returns(true);

            mock.Setup(m => m.BeginScope(It.IsAny<object>()))
                .Returns<IDisposable>(null);

            //todo: Implement Log List further for fun

            return mock.Object;
        }

        private void SeedData()
        {
            var book = new PhoneBook
            {
                Name = "Seed",
            };
            var entry = new Entry
            {
                Name = "Seed",
                PhoneNumber = "0833452693",
                PhoneBookId = 1,
            };

            Context.Add(book);
            Context.Add(entry);

            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
