using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Api.Models
{
    public class ContainerDetail
    {
        public int ContainerId { get; set; }
        public string ContainerImage { get; set; }

        public string ContainerImageBase64 { get; set; }

        public Byte[] ContainerImageAsBytes { get; set; }
    }
}
