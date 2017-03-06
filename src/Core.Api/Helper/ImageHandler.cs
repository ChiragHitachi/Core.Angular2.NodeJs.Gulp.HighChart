using Core.Api.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.AngularJS2.Gulp.Demo.Helper
{
    public static class ImageHandler
    {
        public static IList<Role> _roles = new List<Role>() {
            new Role() { RoleId = 1, IsValid = false, RoleText = "Image Analyzer", RoleGivenTime = DateTime.Now },
            new Role() { RoleId = 2, IsValid = false, RoleText = "Inspector", RoleGivenTime = DateTime.Now.AddDays(1) },
            new Role() { RoleId = 3, IsValid = false, RoleText = "Supervisor", RoleGivenTime = DateTime.Now.AddDays(10) }
        };
        public static Byte[] ImageAsByteArray(string imagePath)
        {
            return File.ReadAllBytes(imagePath);
        }

        public static string ImageAsBase64(string imagePath)
        {
            var imageBytes = ImageAsByteArray(imagePath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }

        public static ContainerDetail GetContainerDetails()
        {
            var imagePath = @"http://localhost:61662/images/container.tiff";

            return new ContainerDetail()
            {
                ContainerId = 1,
                ContainerImage = imagePath,
                //ContainerImageBase64 = ImageAsBase64(imagePath),
                //ContainerImageAsBytes = ImageAsByteArray(imagePath)
            };
        }

        public static IList<Role> GetMyRoles()
        {
            return _roles;
        }
    }
}
