
namespace ContactHopper.API.Config
{
    public static partial class Constants
    {
        public static class Swagger
        {
            public const string SwaggerVersion = "v1";
            public const string SwaggerTitle = "ContactHopper API";
        }

        public static class Database
        {
            public const string ContextSqlConnection = "ContactHopperDb";
            public const string ContextInMemoryConnection = "Memory_ContactHopperDb";
        }
    }
}
