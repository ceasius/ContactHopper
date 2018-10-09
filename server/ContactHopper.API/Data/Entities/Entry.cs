

using Newtonsoft.Json;

namespace ContactHopper.API.Data.Entities
{
    public class Entry
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int PhoneBookId { get; set; }

        [JsonIgnore]
        public PhoneBook PhoneBook { get; set; }
    }
}
