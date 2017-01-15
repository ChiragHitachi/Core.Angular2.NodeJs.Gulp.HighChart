using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Api.Models
{
    public class ContainerStatus
    {
        public int IgnoredContainers { get; set; }
        public int GoodContainers { get; set; }
        public int BadContainers { get; set; }
    }
}
