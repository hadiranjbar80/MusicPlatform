using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TrackPlaylistUserRelationsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Tracks",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Playlists",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tracks_UserId",
                table: "Tracks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Playlists_UserId",
                table: "Playlists",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Playlists_AspNetUsers_UserId",
                table: "Playlists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tracks_AspNetUsers_UserId",
                table: "Tracks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Playlists_AspNetUsers_UserId",
                table: "Playlists");

            migrationBuilder.DropForeignKey(
                name: "FK_Tracks_AspNetUsers_UserId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Tracks_UserId",
                table: "Tracks");

            migrationBuilder.DropIndex(
                name: "IX_Playlists_UserId",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tracks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Playlists");
        }
    }
}
