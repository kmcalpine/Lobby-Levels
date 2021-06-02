using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using CodApi;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private Api _API;
        private Authenticate _auth;

        public ApiController(Authenticate auth, Api api)
        {
            _auth = auth;
            
            _API = api;
            _API.Auth(ref auth);
        }

        [HttpGet("search/{username}")]
        public async Task<JObject> SearchPlayer(string username)
        {
            Console.WriteLine("in here");
            var appUsers =
                new List<string> {

                };

            var random = new Random();
            int index = random.Next(appUsers.Count);

            _auth.Login(appUsers[index], "");

            Console.WriteLine(appUsers[index]);

            var response = await _API.SearchPlayer("uno", username);
            var deserializedContent = (JObject)JsonConvert.DeserializeObject(response.Content);

            return deserializedContent;
        }

        [HttpGet("match/{id}")]
        public async Task<JObject> MatchInfo(string id)
        {

            var appUsers =
                new List<string> {
                    "gilot27689@684hh.com",
                    "hahig79865@art2427.com",
                    "pasod59947@ddwfzp.com",
                    "mayob74836@shzsedu.com"
                };
            var random = new Random();
            int index = random.Next(appUsers.Count);

            _auth.Login(appUsers[index], "hVqr9L2qN8uhDd8");

            var response = await _API.MatchInfo("v2", "mw", "wz", id);
            var deserializedContent = (JObject)JsonConvert.DeserializeObject(response.Content);

            return deserializedContent;
        }

        [HttpGet("matchstats/{id}")]
        public async Task<JObject> MatchStats(string id)
        {

            var client = new RestClient("http://api.tracker.gg/api/v2/warzone/standard/matches/" + id);
            client.Timeout = -1;

            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");

            var queryResult = await client.ExecuteAsync<IRestResponse>(request);
            var deserializedContent = (JObject)JsonConvert.DeserializeObject(queryResult.Content);

            return deserializedContent;
        }

        [HttpGet("playermatches/{platform}/{id}")]
        public async Task<JObject> PlayerMatches(string platform, string id)
        {

            var client = new RestClient("https://api.tracker.gg/api/v2/warzone/standard/matches/" + platform + "/" + id + "?type=wz");
            client.Timeout = -1;

            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");

            var queryResult = await client.ExecuteAsync<IRestResponse>(request);
            var deserializedContent = (JObject)JsonConvert.DeserializeObject(queryResult.Content);

            return deserializedContent;
        }

        [HttpGet("playerstats/{id}")]
        public async Task<JObject> PlayerStats(string id)
        {
            id = id.Replace("#", "%23");
            Console.WriteLine("https://api.tracker.gg/api/v2/warzone/standard/profile/atvi/" + id);
            var client = new RestClient("https://api.tracker.gg/api/v2/warzone/standard/profile/atvi/" + id);
            client.Timeout = -1;

            var request = new RestRequest(Method.GET);
            request.AddHeader("content-type", "application/json");

            var queryResult = await client.ExecuteAsync<IRestResponse>(request);
            var deserializedContent = (JObject)JsonConvert.DeserializeObject(queryResult.Content);

            return deserializedContent;
        }
    }
}
