using Xunit;

namespace ContactHopper.API.IntegrationTests.Controllers.Resources
{
    [CollectionDefinition("IntegrationTestFixture")]
    public class IntegrationTestCollection : ICollectionFixture<IntegrationTestFixture>
    {
    }
}
