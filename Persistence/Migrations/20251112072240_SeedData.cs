using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "775c0a02-2f5b-46d2-9737-29c05aa19205");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bedc949a-0e4b-4bfe-b20d-61caac0ec2ac");

            migrationBuilder.InsertData(
                table: "Albums",
                columns: new[] { "Id", "Cover", "ReleaseDate", "Title", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "3bc09.jpeg", new DateOnly(2023, 11, 15), "Midnight Dreams", 2, "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 2, "3bc09.jpeg", new DateOnly(2024, 2, 10), "Echoes of Silence", 0, "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 3, "3bc09.jpeg", new DateOnly(2022, 8, 25), "Golden Horizon", 1, "406f9444-5f91-4c74-86c7-366f53f310fb" }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "190d011b-a904-48ce-9ae0-920de3c64126", null, "User", "USER" },
                    { "c027f5af-c655-4148-8feb-f534e4428ea6", null, "Artist", "ARTIST" }
                });

            migrationBuilder.InsertData(
                table: "Playlists",
                columns: new[] { "Id", "Cover", "CreationDate", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, "3bc09.jpeg", new DateOnly(2024, 4, 15), "Chill Vibes", "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 2, "3bc09.jpeg", new DateOnly(2023, 12, 1), "Workout Pump", "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 3, "3bc09.jpeg", new DateOnly(2022, 9, 20), "Acoustic Nights", "406f9444-5f91-4c74-86c7-366f53f310fb" }
                });

            migrationBuilder.InsertData(
                table: "Tracks",
                columns: new[] { "Id", "AlbumId", "Attachment", "Cover", "Duration", "Plays", "ReleaseDate", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 3, 45), 1200, new DateOnly(2023, 11, 15), "Into the Night", "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 2, 1, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 4, 12), 850, new DateOnly(2023, 11, 15), "Moonlight Drive", "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 3, 2, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 5, 5), 430, new DateOnly(2024, 2, 10), "Silent Echo", "406f9444-5f91-4c74-86c7-366f53f310fb" },
                    { 4, 3, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 2, 58), 2300, new DateOnly(2022, 8, 25), "Golden Hour", "406f9444-5f91-4c74-86c7-366f53f310fb" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "190d011b-a904-48ce-9ae0-920de3c64126");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c027f5af-c655-4148-8feb-f534e4428ea6");

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tracks",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "775c0a02-2f5b-46d2-9737-29c05aa19205", null, "Artist", "ARTIST" },
                    { "bedc949a-0e4b-4bfe-b20d-61caac0ec2ac", null, "User", "USER" }
                });
        }
    }
}
