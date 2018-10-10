using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ContactHopper.API.Data.Entities
{
    public class PhoneBook
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 3)]
        public string Name { get; set; }
        public ICollection<Entry> Entries { get; set; }
    }
}
