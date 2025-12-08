using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Albums
{
    public class List
    {
        public class Query : IRequest<Result<List<AlbumListDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AlbumListDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<AlbumListDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var albumsList = await _context.Albums
                    .ProjectTo<AlbumListDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                return Result<List<AlbumListDto>>.Success(albumsList);
            }
        }
    }
}