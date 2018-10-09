using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using ContactHopper.API.Config;
using ContactHopper.API.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ContactHopper.API.IntegrationTests.Controllers.Resources
{
    public class TestFixture<TStartup> : IDisposable
    {
        private readonly TestServer _server;

        public HttpClient Client { get; }


        public TestFixture()
            : this(Path.GetFullPath("../../../../ContactHopper.API"))
        {

        }

        protected TestFixture(string contentRoot)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new WebHostBuilder()
                .UseContentRoot(contentRoot)
                .ConfigureServices(InitializeServices)
                .UseConfiguration(config)
                .UseEnvironment(EnvironmentTypes.IntegrationTest)
                .UseStartup(typeof(TStartup));

            if (_server == null)
                _server = new TestServer(builder);

            Client = _server.CreateClient();
            Client.BaseAddress = new Uri("http://localhost");

            SeedData();
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

            var post = Client.PostAsJsonAsync("/api/phonebooks/", book).Result;
            post = Client.PostAsJsonAsync("/api/entries/", entry).Result;
        }

        protected virtual void InitializeServices(IServiceCollection services)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;

            // Inject a custom application part manager. 
            // Overrides AddMvcCore() because it uses TryAdd().
            var manager = new ApplicationPartManager();
            manager.ApplicationParts.Add(new AssemblyPart(startupAssembly));
            manager.FeatureProviders.Add(new ControllerFeatureProvider());
            manager.FeatureProviders.Add(new ViewComponentFeatureProvider());

            services.AddSingleton(manager);
        }

        public void Dispose()
        {
            _server.Dispose();
            Client.Dispose();
        }
    }
}
