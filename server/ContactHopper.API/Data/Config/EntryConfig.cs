using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContactHopper.API.Data.Entities;

namespace ContactHopper.API.Data.Config
{
    public class EntryConfig : IEntityTypeConfiguration<Entry>
    {
        public void Configure(EntityTypeBuilder<Entry> builder)
        {
            builder.HasKey(m => m.Id)
                .ForSqlServerIsClustered(true);
        }
    }
}
