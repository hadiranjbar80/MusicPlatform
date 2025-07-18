using Microsoft.AspNetCore.Http;

namespace Application.Core
{
    public static class Untilities
    {
        public static string UploadFile(IFormFile file, string filePath)
        {
            var fileId = Guid.NewGuid().ToString()
                .Replace("-", "").Substring(0, 5);
            var fileExtension = file.ContentType.Split("/").Last();
            var fileName = $"{fileId}.{fileExtension}";
            
            using (var stream = new FileStream($"{filePath}/{fileName}", FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return fileName;
        }
    }
}