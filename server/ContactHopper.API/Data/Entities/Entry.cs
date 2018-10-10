

using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ContactHopper.API.Data.Entities
{
    public class Entry
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(15, MinimumLength = 8)]
        public string PhoneNumber { get; set; }
        public int PhoneBookId { get; set; }

        [JsonIgnore]
        public PhoneBook PhoneBook { get; set; }
    }
}
