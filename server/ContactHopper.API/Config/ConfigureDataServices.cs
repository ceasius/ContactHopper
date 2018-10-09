using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ContactHopper.API.Data.Context;

namespace ContactHopper.API.Config
{
    public static class ConfigureDataServices
    {
        public static IServiceCollection AddContactSqlServerDb(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString(Constants.Database.ContextSqlConnection);

            //Sets up a SQL Server connection using the connection string in appsettings.json
            services
                .AddDbContext<DataContext>((options) =>
                options.UseSqlServer(connectionString));

            //Allows us to inject interface rather than actual context
            services.AddScoped<IDataContext>(provider =>
                provider.GetService<DataContext>());
            return services;
        }

        public static IServiceCollection AddContactInMemoryDb(this IServiceCollection services)
        {
            services.AddDbContext<DataContext>((options) =>
                options.UseInMemoryDatabase(Constants.Database.ContextInMemoryConnection));

            services.AddScoped<IDataContext>(provider =>
                provider.GetService<DataContext>());

            return services;
        }
    }
}
