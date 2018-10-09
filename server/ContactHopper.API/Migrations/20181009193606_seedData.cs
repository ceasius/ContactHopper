using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactHopper.API.Migrations
{
    public partial class seedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PhoneBooks",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Family" });

            migrationBuilder.InsertData(
                table: "PhoneBooks",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Work" });

            migrationBuilder.InsertData(
                table: "Entries",
                columns: new[] { "Id", "Name", "PhoneBookId", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, "Mom", 1, "0533452690" },
                    { 2, "Dad", 1, "0533452691" },
                    { 3, "Wife", 1, "0533452692" },
                    { 4, "Son", 1, "0533452693" },
                    { 5, "Cousin", 1, "0533452694" },
                    { 6, "Lead", 2, "0533452695" },
                    { 7, "Friend", 2, "0533452696" },
                    { 8, "New Guy", 2, "0533452697" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Entries",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "PhoneBooks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PhoneBooks",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
