using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Api.Models;

namespace Core.Api.Controllers
{
    [Route("api/[controller]")]
    public class ContainerStatusController : Controller
    {
        [HttpGet]
        public ContainerStatus Get()
        {
            return new ContainerStatus() { BadContainers = 2, GoodContainers = 5, IgnoredContainers = 10 };
        }
    }
}
