using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ContactHopper.API.Data.Entities;

namespace ContactHopper.API.Data.Config
{
    public class PhoneBookConfig : IEntityTypeConfiguration<PhoneBook>
    {
        public void Configure(EntityTypeBuilder<PhoneBook> builder)
        {
            builder.HasKey(m => m.Id)
                .ForSqlServerIsClustered(true);

            builder
                .HasMany<Entry>(e => e.Entries)
                .WithOne(p => p.PhoneBook)
                .HasForeignKey(s => s.PhoneBookId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
