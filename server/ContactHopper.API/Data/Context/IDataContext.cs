using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ContactHopper.API.Data.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace ContactHopper.API.Data.Context
{
    public interface IDataContext
    {
        DbSet<PhoneBook> PhoneBooks { get; set; }
        DbSet<Entry> Entries { get; set; }

        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        //EF Core method, not to be confused with DbSet Entries
        EntityEntry Entry(object entity);

        int SaveChanges(bool acceptAllChangesOnSuccess);
        int SaveChanges();
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken));
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
