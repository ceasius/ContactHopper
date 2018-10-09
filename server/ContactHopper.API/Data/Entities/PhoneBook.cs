using System.Collections.Generic;

namespace ContactHopper.API.Data.Entities
{
    public class PhoneBook
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Entry> Entries { get; set; }
    }
}
