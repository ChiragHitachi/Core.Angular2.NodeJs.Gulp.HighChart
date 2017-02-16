using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Api.Models
{
    public class ToDo
    {
        public int ToDoId { get; set; }
        public string ToDoText { get; set; }

        public DateTime ToDoTime { get; set; }

        public bool IsCompleted { get; set; }
        
    }
}
