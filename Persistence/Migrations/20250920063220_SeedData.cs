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
                keyValue: "ac54bf31-082e-4ce5-9225-917807a1b580");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f71cb194-6fea-4a49-a1f0-36a559639603");

            migrationBuilder.InsertData(
                table: "Albums",
                columns: new[] { "Id", "Cover", "ReleaseDate", "Title", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "3bc09.jpeg", new DateOnly(2023, 11, 15), "Midnight Dreams", 2, "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 2, "3bc09.jpeg", new DateOnly(2024, 2, 10), "Echoes of Silence", 0, "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 3, "3bc09.jpeg", new DateOnly(2022, 8, 25), "Golden Horizon", 1, "e57983a2-c13a-4e33-b661-f7726bcf9126" }
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0242ab20-d778-47b8-ae41-83b688795521", null, "User", "USER" },
                    { "da501de5-d560-47e3-ae31-81dc337ad624", null, "Artist", "ARTIST" }
                });

            migrationBuilder.InsertData(
                table: "Playlists",
                columns: new[] { "Id", "Cover", "CreationDate", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, "3bc09.jpeg", new DateOnly(2024, 4, 15), "Chill Vibes", "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 2, "3bc09.jpeg", new DateOnly(2023, 12, 1), "Workout Pump", "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 3, "3bc09.jpeg", new DateOnly(2022, 9, 20), "Acoustic Nights", "e57983a2-c13a-4e33-b661-f7726bcf9126" }
                });

            migrationBuilder.InsertData(
                table: "Tracks",
                columns: new[] { "Id", "AlbumId", "Attachment", "Cover", "Duration", "Plays", "ReleaseDate", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 3, 45), 1200, new DateOnly(2023, 11, 15), "Into the Night", "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 2, 1, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 4, 12), 850, new DateOnly(2023, 11, 15), "Moonlight Drive", "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 3, 2, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 5, 5), 430, new DateOnly(2024, 2, 10), "Silent Echo", "e57983a2-c13a-4e33-b661-f7726bcf9126" },
                    { 4, 3, "0f067.mpeg", "3bc09.jpeg", new TimeOnly(0, 2, 58), 2300, new DateOnly(2022, 8, 25), "Golden Hour", "e57983a2-c13a-4e33-b661-f7726bcf9126" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0242ab20-d778-47b8-ae41-83b688795521");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da501de5-d560-47e3-ae31-81dc337ad624");

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
                    { "ac54bf31-082e-4ce5-9225-917807a1b580", null, "Artist", "ARTIST" },
                    { "f71cb194-6fea-4a49-a1f0-36a559639603", null, "User", "USER" }
                });
        }
    }
}
