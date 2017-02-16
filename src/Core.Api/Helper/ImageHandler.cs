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
        public static IList<ToDo> _toDoList = new List<ToDo>() {
            new ToDo() { ToDoId = 1, IsCompleted = false, ToDoText = "Buy Milk", ToDoTime = DateTime.Now },
            new ToDo() { ToDoId = 2, IsCompleted = false, ToDoText = "Buy Vegetables", ToDoTime = DateTime.Now.AddDays(1) },
            new ToDo() { ToDoId = 3, IsCompleted = false, ToDoText = "Pay Elec Bill", ToDoTime = DateTime.Now.AddDays(10) },
            new ToDo() { ToDoId = 4, IsCompleted = false, ToDoText = "Pay House Rent", ToDoTime = DateTime.Now.AddDays(20) },

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

        public static IList<ToDo> GetToDoItems()
        {
            return _toDoList;
        }
    }
}
