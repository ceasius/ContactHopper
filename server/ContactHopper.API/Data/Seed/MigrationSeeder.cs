using ContactHopper.API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ContactHopper.API.Data.Seed
{
    public class MigrationSeeder
    {
        private readonly ModelBuilder _modelBuilder;
        public MigrationSeeder(ModelBuilder modelBuilder)
        {
            _modelBuilder = modelBuilder;
        }

        public MigrationSeeder CreateData()
        {
            var phoneBooks = new List<PhoneBook>();
            var entries = new List<Entry>();

            {
                var bookA = new PhoneBook
                {
                    Id = 1,
                    Name = "Family",
                    Entries = new List<Entry>
                    {
                        new Entry { Id = 1, Name = "Mom", PhoneNumber = "0533452690" },
                        new Entry { Id = 2, Name = "Dad", PhoneNumber = "0533452691" },
                        new Entry { Id = 3, Name = "Wife", PhoneNumber = "0533452692" },
                        new Entry { Id = 4, Name = "Son", PhoneNumber = "0533452693" },
                        new Entry { Id = 5, Name = "Cousin", PhoneNumber = "0533452694" },
                    },
                };
                phoneBooks.Add(bookA);
            }
            {
                var bookB = new PhoneBook
                {
                    Id = 2,
                    Name = "Work",
                    Entries = new List<Entry>
                    {
                        new Entry { Id = 5, Name = "Lead", PhoneNumber = "0533452695" },
                        new Entry { Id = 6, Name = "Friend", PhoneNumber = "0533452696" },
                        new Entry { Id = 7, Name = "New Guy", PhoneNumber = "0533452697" },
                    },
                };
                phoneBooks.Add(bookB);
            }
            _modelBuilder.Entity<PhoneBook>().HasData(phoneBooks.ToArray());
            _modelBuilder.Entity<Entry>().HasData(entries.ToArray());

            return this;
        }
    }
}
